<?php

/*
 * This file is part of the Elcodi package.
 *
 * Copyright (c) 2014-2015 Elcodi.com
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * Feel free to edit as you please, and have fun.
 *
 * @author Marc Morera <yuhu@mmoreram.com>
 * @author Aldo Chiecchia <zimage@tiscali.it>
 * @author Elcodi Team <tech@elcodi.com>
 */

namespace Elcodi\Store\PageBundle\EventListener\Abstracts;

use Swift_Mailer;
use Twig_Environment;

use Elcodi\Component\Page\Entity\Interfaces\PageInterface;
use Elcodi\Component\Page\Repository\PageRepository;

/**
 * Class AbstractEmailSenderEventListener
 */
abstract class AbstractEmailSenderEventListener
{
    /**
     * @var Swift_Mailer
     *
     * Mailer
     */
    protected $mailer;

    /**
     * @var Twig_Environment
     *
     * Twig
     */
    protected $twig;

    /**
     * @var PageRepository
     *
     * Page repository
     */
    protected $pageRepository;

    /**
     * @var string
     *
     * Store email
     */
    protected $storeEmail;

    /**
     * Construct
     *
     * @param Swift_Mailer     $mailer         Mailer
     * @param Twig_Environment $twig           Twig
     * @param PageRepository   $pageRepository Page repository
     * @param string           $storeEmail     Store email
     */
    public function __construct(
        Swift_Mailer $mailer,
        Twig_Environment $twig,
        PageRepository $pageRepository,
        $storeEmail
    ) {
        $this->mailer = $mailer;
        $this->twig = $twig;
        $this->pageRepository = $pageRepository;
        $this->storeEmail = $storeEmail;
    }

    /**
     * Send email
     *
     * @param string $emailName     Email name
     * @param array  $context       Context
     * @param string $receiverEmail Receiver email
     */
    protected function sendEmail($emailName, array $context, $receiverEmail)
    {
        $page = $this
            ->pageRepository
            ->findOneBy([
                'name' => $emailName,
            ]);

        if ($page instanceof PageInterface) {
            $resolvedPage = $this
                ->twig
                ->render('StorePageBundle::email.html.twig', array_merge([
                    'content' => $page->getContent(),
                ], $context));

            $message = $this
                ->mailer
                ->createMessage()
                ->setSubject($page->getTitle())
                ->setFrom($this->storeEmail)
                ->setTo($receiverEmail)
                ->setBody($resolvedPage, 'text/html');

            $this
                ->mailer
                ->send($message);
        }
    }
}
