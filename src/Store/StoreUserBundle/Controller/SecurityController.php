<?php

/**
 * This file is part of the Elcodi package.
 *
 * Copyright (c) 2014 Elcodi.com
 *
 * This distribution is just a basic e-commerce implementation based on
 * Elcodi project.
 *
 * Feel free to edit it, and make your own
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author ##author_placeholder
 * @version ##version_placeholder##
 */

namespace Store\StoreUserBundle\Controller;

use Symfony\Component\Form\FormView;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Mmoreram\ControllerExtraBundle\Annotation\Form as AnnotationForm;
use Mmoreram\ControllerExtraBundle\Annotation\Entity;

use Elcodi\UserBundle\Entity\Interfaces\CustomerInterface;
use Elcodi\CoreBundle\Services\ManagerProvider;

/**
 * Class SecurityController
 */
class SecurityController extends Controller
{
    /**
     * Login page
     *
     * @param FormView $loginFormView Login form view
     *
     * @return array
     *
     * @Route(
     *      path = "/login",
     *      name = "store_login"
     * )
     * @Template
     *
     * @AnnotationForm(
     *      class = "store_user_form_type_login",
     *      name  = "loginFormView"
     * )
     */
    public function loginAction(FormView $loginFormView)
    {
        /**
         * If user is already logged, go to redirect url
         */
        if ($this->get('security.context')->isGranted('ROLE_CUSTOMER')) {
            return new RedirectResponse($this->generateUrl('store_homepage'));
        }

        return [
            'form' => $loginFormView,
        ];
    }

    /**
     * Register page
     *
     * @param CustomerInterface $customer         empty customer
     * @param FormView          $registerFormView Register form type
     * @param boolean           $isValid          Form submition is valid
     *
     * @return array
     *
     * @Route(
     *      path = "/register",
     *      name = "store_register"
     * )
     * @Method({"GET", "POST"})
     * @Template
     *
     * @Entity(
     *      name          = "customer",
     *      factoryClass  = "elcodi.core.user.factory.customer",
     *      factoryMethod = "create",
     *      factoryStatic = false,
     *      persist       = false
     * )
     * @AnnotationForm(
     *      class         = "store_user_form_type_register",
     *      entity        = "customer",
     *      handleRequest = true,
     *      name          = "registerFormView",
     *      validate      = "isValid"
     * )
     */
    public function registerAction(
        CustomerInterface $customer,
        FormView $registerFormView,
        $isValid
    )
    {
        if ($isValid) {

            /**
             * @var ManagerProvider $managerProvider
             */
            $managerProvider = $this->get('elcodi.manager_provider');
            $customerManager = $managerProvider->getManagerByEntityParameter('elcodi.core.user.entity.customer.class');
            $customerManager->persist($customer);
            $customerManager->flush($customer);

            $this
                ->get('elcodi.core.user.service.customer_manager')
                ->register($customer, 'customer_secured_area');

            return $this->redirect($this->generateUrl('store_homepage'));
        }

        return [
            'form' => $registerFormView,
        ];
    }
}
